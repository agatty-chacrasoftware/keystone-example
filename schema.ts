/*
Welcome to the schema! The schema is the heart of Keystone.

Here we define our 'lists', which will then be used both for the GraphQL
API definition, our database tables, and our Admin UI layout.

Some quick definitions to help out:
A list: A definition of a collection of fields with a name. For the starter
  we have `User`, `Post`, and `Tag` lists.
A field: The individual bits of data on your list, each with its own type.
  you can see some of the lists in what we use below.

*/
import { list } from '@keystone-6/core';
import {
  text,
  relationship,
  password,
  timestamp,
  select,
  integer,
} from '@keystone-6/core/fields';
import { document } from '@keystone-6/fields-document';
export const lists = {
  User: list({
    fields: {
      name: text({ validation: { isRequired: true } }),
      email: text({
        validation: { isRequired: true },
        isIndexed: 'unique',
        isFilterable: true,
      }),
      password: password({ validation: { isRequired: true } }), // Make sure you read the docs to understand how they work: https://keystonejs.com/docs/guides/relationships#understanding-relationships
      posts: relationship({ ref: 'Post.author', many: true }),
    },
    ui: {
      listView: {
        initialColumns: ['name', 'posts'],
      },
    },
  }),

  Post: list({
    fields: {
      title: text(),
      status: select({
        options: [
          { label: 'Published', value: 'published' },
          { label: 'Draft', value: 'draft' },
        ],
        defaultValue: 'draft',
        ui: {
          displayMode: 'segmented-control',
        },
      }),
      content: document({
        formatting: true,
        layouts: [
          [1, 1],
          [1, 1, 1],
          [2, 1],
          [1, 2],
          [1, 2, 1],
        ],
        links: true,
        dividers: true,
      }),
      publishDate: timestamp(),
      author: relationship({
        ref: 'User.posts',
        ui: {
          displayMode: 'cards',
          cardFields: ['name', 'email'],
          inlineEdit: { fields: ['name', 'email'] },
          linkToItem: true,
          inlineCreate: { fields: ['name', 'email'] },
        },
      }),
      // We also link posts to tags. This is a many <=> many linking.
      tags: relationship({
        ref: 'Tag.posts',
        ui: {
          displayMode: 'cards',
          cardFields: ['name'],
          inlineEdit: { fields: ['name'] },
          linkToItem: true,
          inlineConnect: true,
          inlineCreate: { fields: ['name'] },
        },
        many: true,
      }),
    },
  }),
  // Our final list is the tag list. This field is just a name and a relationship to posts
  Tag: list({
    ui: {
      isHidden: true,
    },
    fields: {
      name: text(),
      posts: relationship({ ref: 'Post.tags', many: true }),
    },
  }),

  // first example
  Car: list({
    fields: {
      model: text({validation: {isRequired: true}}),
      brand: text({validation: {isRequired: true}}),
      price: integer({validation: {isRequired: true}}),
      yearOfManufacture: integer({validation: {isRequired: true}}),
      upgradeList: relationship({ ref: 'Upgrade.cars', many: true }),
    },
    ui: {
      listView: {
        initialColumns: ['model','upgradeList'],
      },
    },
  }),

  Upgrade:list({
    fields:{
      upgardeYear: integer({validation: {isRequired: true}}),
      cars: relationship({
        ref: 'Car.upgradeList',
        ui: {
          displayMode: 'cards',

          cardFields: ['model', 'brand'],
          inlineEdit: { fields: ['model', 'brand'] },
          linkToItem: true,
          inlineCreate: { fields: ['model', 'brand'] },
        },
      }),
    }
  }),

  // second exampe
  Student: list({
    fields: {
      name: text({
        db:{map: "studentName"}
      }),
      class: select ({
        type: 'enum',
        options:[
          {label: '1ST', value: "firstYear"},
          {label: '2ND', value: "secondYear"}
        ],
        db:{map: "class"},
        ui: {displayMode: "select"}
      }),
      books: relationship({ ref: 'BookAssignment.studentName', many: true }),
    },
    ui: {
      listView: {
        initialColumns: ["name", "books"]
      }
    }
  }),

  Book:list({
    fields: {
      title: text({
        db: {map: "bookTitle"},
      }),
      category: select({
        type: 'enum',
        options: [
          {label: "Computer Science", value: "ComputerScience"},
          {label: "Arts", value:"Arts"},
          {label: "Business Studies", value: "Business"},
          {label: "Accountancy", value: "Accounts"}
        ]
      }),
      assignedToStudents: relationship({ref: "BookAssignment.bookName",many: true})
    }
  }),

  BookAssignment:list({
    fields: {
      bookName: relationship({
        ref: "Book.assignedToStudents",
        ui: {
          hideCreate: true,
          displayMode: "select",
          labelField: "title",
        }
      }),
      studentName: relationship({
        ref: "Student.books",
        ui: {
          hideCreate: true,
          displayMode: "select",
          labelField: "name"
        }
      }),
    }
  })
};
