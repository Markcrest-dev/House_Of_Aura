export default {
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Client Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'quote',
      title: 'Quote Text',
      type: 'text',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'service',
      title: 'Service Received',
      type: 'string',
    },
    {
      name: 'stars',
      title: 'Star Rating',
      type: 'number',
      initialValue: 5,
      validation: (Rule: any) => Rule.min(1).max(5),
    },
  ],
}
