import {rest} from 'msw'
import faker from '@faker-js/faker'

export const handlers = [
    // Handles a POST /login request
    rest.post('/authenticate', (req, res, ctx) => {
        // Persist user's authentication in the session
        // sessionStorage.setItem('is-authenticated', 'true')

        return res(
            // Respond with a 200 status code
            ctx.status(200),
            ctx.json({
              user: {
                token: faker.datatype.uuid()
              }
            })
        )
    }),
]
