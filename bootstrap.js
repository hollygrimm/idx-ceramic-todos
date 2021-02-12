const { writeFile } = require('fs').promises
const Ceramic = require('@ceramicnetwork/http-client').default
const { createDefinition, publishSchema } = require('@ceramicstudio/idx-tools')
const { Ed25519Provider } = require('key-did-provider-ed25519')
const fromString = require('uint8arrays/from-string')

const CERAMIC_URL = 'https://ceramic-clay.3boxlabs.com'

const TaskSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'Task',
  type: 'object',
  properties: {
    date: {
      type: 'string',
      format: 'date-time',
      title: 'date',
      maxLength: 30,
    },
    title: {
        type: 'string',
        title: 'title',
        maxLength: 4000,
    },    
    text: {
      type: 'string',
      title: 'text',
      maxLength: 4000,
    },
    completed: {
        type: 'boolean',
        title: 'completed',
      },    
  },
}

const TasksListSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'TasksList',
  type: 'object',
  properties: {
    tasks: {
      type: 'array',
      title: 'tasks',
      items: {
        type: 'object',
        title: 'TaskItem',
        properties: {
          id: {
            $ref: '#/definitions/CeramicDocId',
          },
          title: {
            type: 'string',
            title: 'title',
            maxLength: 100,
          },
        },
      },
    },
  },
  definitions: {
    CeramicDocId: {
      type: 'string',
      pattern: '^ceramic://.+(\\\\?version=.+)?',
      maxLength: 150,
    },
  },
}

async function run() {
  // The seed must be provided as an environment variable
  const seed = fromString(process.env.SEED, 'base16')
  // Connect to the local Ceramic node
  const ceramic = new Ceramic(CERAMIC_URL)
  // Authenticate the Ceramic instance with the provider
  await ceramic.setDIDProvider(new Ed25519Provider(seed))

  // Publish the two schemas
  const [taskSchema, tasksListSchema] = await Promise.all([
    publishSchema(ceramic, { content: TaskSchema }),
    publishSchema(ceramic, { content: TasksListSchema }),
  ])

  // Create the definition using the created schema ID
  const tasksDefinition = await createDefinition(ceramic, {
    name: 'tasks',
    description: 'Simple text tasks',
    schema: tasksListSchema.commitId.toUrl(),
  })

  // Write config to JSON file
  const config = {
    definitions: {
      tasks: tasksDefinition.id.toString(),
    },
    schemas: {
      Task: taskSchema.commitId.toUrl(),
      TasksList: tasksListSchema.commitId.toUrl(),
    },
  }
  await writeFile('./src/config.json', JSON.stringify(config))

  console.log('Config written to src/config.json file:', config)
  process.exit(0)
}

run().catch(console.error)