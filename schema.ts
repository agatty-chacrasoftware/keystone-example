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
        many: false,
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
      name: text({
        db:{
          map: "name"
        }
      }),
      email: text({
        validation: {
          isRequired: true
        },
        isIndexed: 'unique',
        db: {
          map: "email"
        }
      }),
      address: text({
        db: {
          map: "Address"
        }
      }),
      pincode: integer({
        validation: {
          max: 99999,
          min: 10000
        }
      }),
      phoneNumber: integer({
        validation: {
          max: 999999999,
          min: 100000000
        }
      }),
      bookedRooms: relationship({
        ref: "Booking.customer", many: true
      })
    },
    ui: {
      listView: {
        initialColumns: ["name", "bookedRooms"]
      }
    }
  }),

  Hotel: list({
    fields: {
      name: text({
        db: {
          map: "hotelName"
        }
      }),
      branch: text({
        db: {
          map: "branchName"
        }
      }),
      country: text({
        db: {
          map: "country"
        },
        defaultValue: "India"
      }),
      rooms: relationship({
        ref: "Room.hotelBranch",
        many: true
      })
    },
    ui: {
      listView: {
        initialColumns: ["name", "rooms"]
      }
    }
  }),

  Room: list({
    fields: {
      name: text({
        db: {
          map: "roomNo"
        }
      }),
      roomDescription: text({
        db: {
          map:"roomDescription"
        }
      }),
      roomPrice: integer(),
      hotelBranch: relationship({
        ref: "Hotel.rooms",
        many: false,
      }),
      bookings: relationship({
        ref: "Booking.rooms", 
        many: false
      })
    },
    ui: {
      listView: {
        initialColumns: ["name", "hotelBranch", "bookings"]
      }
    }
  }),

  Booking: list({
    fields: {
      customer: relationship({
        ref: "Customer.bookedRooms", many: false,
      ui: {
        hideCreate: true
      }}),
      rooms: relationship({
        ref:"Room.bookings", 
        many: true,
        ui: {
          hideCreate: true
        }
      }),
    },
    ui: {
      listView: {
        initialColumns: ["customer", "rooms"]
      }
    }
  })
};