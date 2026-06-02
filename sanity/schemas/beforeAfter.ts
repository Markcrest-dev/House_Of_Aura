export default {
  name: 'beforeAfter',
  title: 'Before & After Transformation',
  type: 'document',
  fields: [
    {
      name: 'service',
      title: 'Service Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'stylist',
      title: 'Stylist/Artist Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'beforeImage',
      title: 'Before Image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'afterImage',
      title: 'After Image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'beforeColor',
      title: 'Before Backdrop Color (Fallback CSS color)',
      type: 'string',
      initialValue: '#1a1520',
    },
    {
      name: 'afterColor',
      title: 'After Backdrop Color (Fallback CSS color)',
      type: 'string',
      initialValue: '#2a2030',
    },
  ],
}
