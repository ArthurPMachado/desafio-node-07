import { APIGatewayEvent } from "aws-lambda"

import { documentClient } from "../../utils/dynamoClient";

export const handle = async (event: APIGatewayEvent) => {
  const { user_id } = event.pathParameters

  const response = await documentClient.query({
    TableName: "todos",
    KeyConditionExpression: "user_id = :user_id",
    ExpressionAttributeValues: {
      ":user_id": user_id
    }
  }).promise()

  return {
    statusCode: 201,
    body: JSON.stringify(response.Items),
    headers: {
      "Content-Type": "application/json"
    }
  }

}
