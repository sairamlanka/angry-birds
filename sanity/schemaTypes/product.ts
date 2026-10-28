import { defineField, defineType } from 'sanity';

export const product = defineType({
  name: 'product',
  title: 'Menu Item',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (r) => r.required().max(60),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'price',
      title: 'Price (₹)',
      type: 'number',
      validation: (r) => r.required().min(0).precision(2),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      initialValue: 'burgers',
      options: {
        layout: 'radio',
        list: [
          { title: 'Burgers', value: 'burgers' },
          { title: 'Sides', value: 'sides' },
          { title: 'Drinks', value: 'drinks' },
          { title: 'Specials', value: 'specials' },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (r) => r.max(200),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Use a transparent PNG for the best hero effect.',
    }),
    defineField({
      name: 'isFeatured',
      title: 'Show in hero (featured)',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'isAvailable',
      title: 'Available to order',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort order (lower first)',
      type: 'number',
      initialValue: 100,
    }),
  ],
  orderings: [
    {
      title: 'Sort order',
      name: 'sortOrderAsc',
      by: [{ field: 'sortOrder', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'name', subtitle: 'price', media: 'image' },
    prepare({ title, subtitle, media }) {
      return { title, subtitle: subtitle !== undefined ? `₹${subtitle}` : '', media };
    },
  },
});
