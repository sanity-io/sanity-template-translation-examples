import S from '@sanity/desk-tool/structure-builder'
import * as I18nS from 'sanity-plugin-intl-input/lib/structure';
import { i18n } from './schemas/documentTranslation'

import {
  GrDocumentText as FieldIcon,
  GrMultiple as DocumentIcon,
  GrTextAlignLeft as PostIcon,
  GrUser as AuthorIcon,
  GrArticle as ArticleIcon
} from 'react-icons/gr'

export const getDefaultDocumentNode = (props) => {
  if (props.schemaType === 'post') {
    return S.document().views(I18nS.getDocumentNodeViewsForSchemaType(props.schemaType));
  }
  return S.document();
};

export default () =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Field level')
        .icon(FieldIcon)
        .child(
          S.list()
            .id('field-level')
            .title('Field level translations')
            .items(
              [
                S.documentTypeListItem('article')
                  .icon(ArticleIcon),
                S.documentTypeListItem('author')
                  .icon(AuthorIcon),
              ]
            )
        ),
      S.listItem()
        .title('Document level')
        .icon(DocumentIcon)
        .child(
          S.list()
            .id('doc-level')
            .title('Document level translations')
            .items([
              S.listItem()
                .title('Post')
                .id('post-docs')
                .icon(PostIcon)
                .schemaType('post')
                .child(
                  S.documentList()
                    .id('post')
                    .title('Posts')
                    // Use a GROQ filter to get documents.
                    .filter('_type == "post" && (!defined(_lang) || _lang == $baseLang)')
                    .params({ baseLang: i18n.base })
                    .canHandleIntent((_name, params, _context) => {
                      // Assume we can handle all intents (actions) regarding post documents
                      return params.type === 'post'
                    })
                )
            ]
            )
        ),
    ])
