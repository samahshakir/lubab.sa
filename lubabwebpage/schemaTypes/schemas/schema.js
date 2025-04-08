// schemas/schema.js
import createSchema from 'part:@sanity/base/schema-creator';
import schemaTypes from 'all:part:@sanity/base/schema-type';

// Import your schema types
import blog from './blog';
import blogSection from './blogSection';

// Create schema
export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
    blog,
    blogSection
  ])
});