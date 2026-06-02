export default {
  name: 'artist',
  title: 'Artist',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'specialty',
      title: 'Specialty',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'bio',
      title: 'Biography',
      type: 'text',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'accentColor',
      title: 'Accent Glow Color (RGBA/HEX)',
      type: 'string',
      initialValue: 'rgba(212, 168, 92, 0.15)',
    },
    {
      name: 'image',
      title: 'Portrait Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
  ],
}
