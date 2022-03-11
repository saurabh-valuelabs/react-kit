const schema = {
  "type": "object",
  "properties": {
    "pages": {
      "type": "array",
      "minItems": 3,
      "maxItems": 5,
      "items": {
        "type": "object",
        "properties": {
          "url": {
            "type": "string",
          },
          "name": {
            "type": "string",
            "faker": "name.firstName",
            "unique": true,
          },
          "breadcrumb": {
            "type": "string",
            "faker": "name.lastName"
          },
          "components": {
            "type": "string",
            "faker": "internet.email"
          }
        },
        "required": ["url", "name", "breadcrumb", "components"]
      }
    },
    "home": {
      "type": "array",
      "minItems": 3,
      "maxItems": 5,
      "items": {
        "type": "object",
        "properties": {
          "url": {
            "type": "string",
          },
          "name": {
            "type": "string",
            "faker": "name.firstName",
            "unique": true,
          },
          "breadcrumb": {
            "type": "string",
            "faker": "name.lastName"
          },
          "components": {
            "type": "string",
            "faker": "internet.email"
          }
        },
        "required": ["url", "name", "breadcrumb", "components"]
      }
    }
  },
  "required": ["pages","home"]
};

module.exports = schema;
