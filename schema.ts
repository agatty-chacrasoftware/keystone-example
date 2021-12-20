import { list } from '@keystone-6/core';
import {
  text,
  relationship,
  password,
  timestamp,
  select,
  integer,
  checkbox,
} from '@keystone-6/core/fields';
import { document } from '@keystone-6/fields-document';
import { cloudinaryImage } from "@keystone-6/cloudinary";


export const lists = {
 Post: list({
  fields: {
    businessLogo: cloudinaryImage({
      cloudinary: {
        cloudName: "hfq3eckim",
        apiKey: "248851326195459",
        apiSecret: "aqeV1tyn9kXWGLXGd95j4i4c-AQ",
        folder: "samples",
      },
    }),
    titleHeader: text({
      validation:{isRequired: true}
    }),
    subHeader: text(),
    content: document({
      formatting: true,
      dividers: true,
      links: true,
      layouts: [
        [1, 1],
        [1, 1, 1],
      ],
    }),
  }
 })
};