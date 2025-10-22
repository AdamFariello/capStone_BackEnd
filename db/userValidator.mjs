export const userValidator = {
    validator: { 
        $jsonSchema: {
            bsonType: "object",
            required: ["username", "email", "password"],
            properties: {
                username: {
                    bsonType: "string",
                    description: "Required, and must'(b)e a valid unique username"
                },
                email: {
                    bsonType: "string",
                    description: "Required, and must'(b)e a valid email (yarg)"
                },
                password: {
                    bsonType: "string", 
                    description: "Required, must be a valid password "
                }
            }
        }
    },
    validationLevel: "strict",
    validationAction: "error"
}