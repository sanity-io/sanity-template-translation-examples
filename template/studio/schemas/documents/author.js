export default {
  title: 'Author',
  name: 'author',
  type: 'document',
  fields: [
    {
      title: 'Name',
      name: 'name',
      type: 'string',
    },
    {
      type: 'image',
      name: 'image',
      options: {
        hotspot: true
      },
    },
    {
      type: 'richText',
      name: 'bio',
      // Only want the bio to be localized in this case
      localize: true
    }
  ],
}
