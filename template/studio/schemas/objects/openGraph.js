export default {
  title: 'Open graph metadata',
  type: 'object',
  name: 'openGraph',
  options: {
    collapsible: true,
    collapsed: true
  },
  fields: [
    {
      title: 'og:title',
      name: 'title',
      type: 'string',
    },
    {
      title: 'og:type',
      name: 'type',
      type: 'string',
      description: "'website', or 'article' etc",
    },
    {
      title: 'og:image',
      name: 'image',
      description: 'In your frontend you should make use of the asset URL',
      type: 'image'
    }
  ]
}