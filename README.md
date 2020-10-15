# Translation examples

This studio has two main ways of handling translated content

## Field level translations

In this configuration you are dealing with 1 document, say an Article, and any language you want to have localized content for will be saved on the same document. Example schema:

```js
export default {
  title: "Article",
  name: "article",
  type: "document",
  localize: true,
  preview: {
    select: {
      title: "title",
    },
  },
  fields: [
    {
      type: "string",
      name: "title",
    },
    {
      type: "image",
      name: "image",
    },
  ],
};
```

The `localize: true` parameter tells a helper function to transform any field from for example 'string', to an 'object' that has properties for each language you want to support. This transformation happens in `schema.js`.

You can also specify `localize: true` on individual fields, or set it to true on the document level, and override with `localize: false` on individual fields for more control. See the `author.js` schema definition for an example of this, where only the bio field is translated.

### Querying for localized content

An example GROQ query to fetch only the english content for this article

```js
const query = `
* [_type == "article"] {
  "title": title[$lang]
  "image": image[$lang]
}
`;
client.fetch(query, { lang: "en_GB" });
```

The result will be something like

```json
[
  {
    "image": {
      "_type": "image",
      "asset": {
        "_ref": "image-81ea32131654010e50723bbda524d84869880567-289x174-png",
        "_type": "reference"
      }
    },
    "title": "English title"
  }
]
```

So even though the fields are in reality objects, you can fold them down to concrete values in a groq query.

## Document level translations

In this mode we are using the `sanity-intl` plugin to give the editors a UI to switch between locales on a document level. You are starting new content in a base language, and you can add more locales as needed. They are then represented as separate documents, and by switching the locale from the "Translations" tab in the editor, you are looking at the full localized representation of that document.

This mode is enabled in the schema via the `i18n` property

```js
// Global config object for document translations. Customize as needed on a document basis.
import { i18n } from "../documentTranslation";

export default {
  title: "Post",
  name: "post",
  type: "document",
  i18n, // Enables the document level translations
  fields: [
    {
      title: "Title",
      name: "title",
      type: "string",
    },
    {
      title: "Slug",
      name: "slug",
      type: "slug",
      options: {
        source: "title",
      },
    },
    {
      title: "Image",
      name: "image",
      type: "captionImage",
      options: {
        hotspot: true,
      },
    },
    {
      title: "Body",
      name: "body",
      type: "richText",
    },
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
    },
  },
};
```

The Studio includes examples of how to customize the desk structure with this type of translations. See `deskStructure.js`.

### Document level querying

The published document level translations have a property that indicates their locale. In this example that property is set to `_lang`. So if you were only interested in 'en_GB' content you could filter on that

```js
const query = `* [_type == "post" && _lang == "en_GB"]`;
client.fetch(query);
```

And you will only receive posts written in english, in this example query. The documents with translations also have references to their other locale siblings. In this example project that property is named `_langRefs` and can be used to easily bring up other localized versions of a given document.

## Links

- [Read “getting started” in the docs](https://www.sanity.io/docs/introduction/getting-started?utm_source=readme)
- [Join the community Slack](https://slack.sanity.io/?utm_source=readme)
- [Extend and build plugins](https://www.sanity.io/docs/content-studio/extending?utm_source=readme)
