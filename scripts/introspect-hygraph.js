require('dotenv').config({ path: '.env.local' });
const { GraphQLClient, gql } = require('graphql-request');

const HYGRAPH_URL = process.env.NEXT_PUBLIC_HYGRAPH_URL || '';
const HYGRAPH_TOKEN = process.env.HYGRAPH_TOKEN || '';

const hygraph = new GraphQLClient(HYGRAPH_URL, {
  headers: {
    ...(HYGRAPH_TOKEN && { Authorization: `Bearer ${HYGRAPH_TOKEN}` }),
  },
});

// Introspection query to get schema
const INTROSPECTION_QUERY = gql`
  {
    __schema {
      types {
        name
        kind
        fields {
          name
          type {
            name
            kind
            ofType {
              name
              kind
            }
          }
        }
      }
    }
  }
`;

// Query to get actual post data
const GET_SAMPLE_POST = gql`
  {
    posts(first: 1) {
      id
      title
      slug
    }
  }
`;

async function introspect() {
  console.log('\n🔍 Introspecting Hygraph Schema...\n');
  console.log('API URL:', HYGRAPH_URL);
  console.log('Token configured:', HYGRAPH_TOKEN ? 'Yes' : 'No');
  console.log('\n' + '='.repeat(80) + '\n');

  try {
    // Get sample post first
    console.log('📝 Fetching sample posts...\n');
    const sampleData = await hygraph.request(GET_SAMPLE_POST);
    console.log('Sample Posts:', JSON.stringify(sampleData, null, 2));
    console.log('\n' + '='.repeat(80) + '\n');

    // Get schema
    console.log('📊 Fetching schema...\n');
    const schema = await hygraph.request(INTROSPECTION_QUERY);

    // Find relevant types
    const relevantTypes = ['Post', 'Author', 'Category', 'Asset', 'SEO'];

    relevantTypes.forEach(typeName => {
      const type = schema.__schema.types.find(t => t.name === typeName);

      if (type && type.fields) {
        console.log(`\n📦 ${typeName} Model:`);
        console.log('-'.repeat(80));
        type.fields.forEach(field => {
          const fieldType = field.type.name || field.type.ofType?.name || 'Unknown';
          console.log(`  • ${field.name}: ${fieldType}`);
        });
      } else {
        console.log(`\n⚠️  ${typeName} model not found`);
      }
    });

    console.log('\n' + '='.repeat(80));
    console.log('\n✅ Introspection complete!\n');

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    if (error.response) {
      console.error('\nResponse:', JSON.stringify(error.response, null, 2));
    }
  }
}

introspect();
