import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'

import richText from './objects/richText'
import openGraph from './objects/openGraph'
import captionImage from './objects/captionImage'
import article from './documents/article'
import author from './documents/author'
import post from './documents/post'
import { translateFields } from './fieldTranslation'

export default createSchema({
  name: 'default',
  types: schemaTypes
    .concat([
      // Any base object you've defined,
      // or document type that should not have
      // field-level validations
      richText,
      openGraph,
      captionImage,
      post
    ])
    // Include documents with field translation support.
    // This changes their structure, transforming
    // simple fields like 'string' into 'object'
    // with multiple string properties, one per
    // language.
    //
    // Any document definition that does
    // not set localize: true on root level, or
    // set localize: true on any field level will
    // not be changed.
    .concat(translateFields([
      article,
      author
    ]))
})
