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
import { resolveModuleName } from 'typescript';
export const lists = {
  // User & Post example(Already Exists)
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

  /* 
  * Car & Upgrade example
  */
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

  /* 
  * Student and Book example
  */
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
      books: relationship({ 
        ref: 'Book.assignToStudent', 
        many: true 
      }),
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
      assignToStudent: relationship(
        {ref: "Student.books",
        many: true,
        ui:{
          hideCreate: true
        }})
    }
  }),

  /* 
    * Hotel and Bookings example
  */
  Customer: list({
    fields:{
      Name: text({
        db:{
          map: "name"
        }
      }),
      Email: text({
        validation: {
          isRequired: true
        },
        isIndexed: 'unique',
        db: {
          map: "email"
        }
      }),
      Address: text({
        db: {
          map: "Address"
        }
      }),
      Pincode: integer({
        validation: {
          max: 5
        }
      }),
      PhoneNumber: integer({
        validation: {
          max: 10
        }
      }),
      Rooms: relationship({
        ref: "Booking.Customer", many: true
      })
    }
  }),

  Hotel: list({
    fields: {
      Name: text({
        db: {
          map: "hotelName"
        }
      }),
      Branch: text({
        db: {
          map: "branchName"
        },
        defaultValue: "LA"
      }),
      Country: text({
        db: {
          map: "country"
        },
        defaultValue: "India"
      }),
      Rooms: relationship({
        ref: "Room.HotelBranch",
        many: true
      })
    }
  }),

  Room: list({
    fields: {
      HotelBranch: relationship({
        ref: "Hotel.Rooms",
        many: false,
        ui: {
          hideCreate: true,
          displayMode: "select",
          labelField: "Name",
        }
      }),
      RoomNo: integer({
        db: {
          map: "roomNo"
        }
      }),
      RoomDescription: text({
        db: {
          map:"roomDescription"
        }
      }),
      RoomPrice: integer(),
      Booking: relationship({
        ref: "Booking.Room", 
        many: false,
        ui: {
          hideCreate: true
        }
      })
    }
  }),

  Booking: list({
    fields: {
      Customer: relationship({
        ref: "Customer.Rooms", many: true}),
      Room: relationship({
        ref:"Room.Booking", many: false
      }),
      checkIn: timestamp(),
      checkOut: timestamp()
    }
  })
};
