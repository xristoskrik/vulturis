
# admin
# token bacd627e-281d-4955-87f1-701019b2aaf9
# User: 1d23b95c-9014-43b5-bb15-02321c2bae42

# user
# token f9617a2f-cee2-4c9e-b5c7-5d4aa5de44dc
# User: d9fbbd44-6027-4b78-8905-7564d3cba44f



curl -X POST http://localhost:8080/api/cart \
     -H "Content-Type: application/json" \
     -d '{
           "token": "f9617a2f-cee2-4c9e-b5c7-5d4aa5de44dc",
           "product_code": 100002,
           "amount": 5
         }'

echo "\n"

read -p "Press enter to continue\n" #-----------------------------------------------------------------------------

curl -X GET http://localhost:8080/api/cart?action=UUID \
     -H "Content-Type: application/json" \
     -d '{
           "token": "bacd627e-281d-4955-87f1-701019b2aaf9",
           "cart_id": 1
         }'

echo "\n"

curl -X GET http://localhost:8080/api/cart?action=UUID \
     -H "Content-Type: application/json" \
     -d '{
           "token": "f9617a2f-cee2-4c9e-b5c7-5d4aa5de44dc",
           "cart_id": 1
         }'

echo "\n"

curl -X GET http://localhost:8080/api/cart \
     -H "Content-Type: application/json" \
     -d '{
           "token": "bacd627e-281d-4955-87f1-701019b2aaf9",
           "cart_id": 1
         }'

echo "\n"

curl -X GET http://localhost:8080/api/cart \
     -H "Content-Type: application/json" \
     -d '{
           "token": "f9617a2f-cee2-4c9e-b5c7-5d4aa5de44dc",
           "cart_id": 1
         }'

echo "\n"

curl -X GET http://localhost:8080/api/cart \
     -H "Content-Type: application/json" \
     -d '{
           "token": "bacd627e-281d-4955-87f1-701019b2aaf9",
           "cart_id": 2
         }'

echo "\n"

curl -X GET http://localhost:8080/api/cart \
     -H "Content-Type: application/json" \
     -d '{
           "token": "f9617a2f-cee2-4c9e-b5c7-5d4aa5de44dc",
           "cart_id": 2
         }'

echo "\n"

read -p "Press enter to continue\n" #-----------------------------------------------------------------------------

curl -X PUT http://localhost:8080/api/cart?action=UUID \
     -H "Content-Type: application/json" \
     -d '{
           "token": "f9617a2f-cee2-4c9e-b5c7-5d4aa5de44dc",
           "user_uuid": "f9617a2f-cee2-4c9e-b5c7-5d4aa5de44dc",
           "cart_id": 2
         }'

read -p "continue"

curl -X PUT http://localhost:8080/api/cart?action=UUID \
     -H "Content-Type: application/json" \
     -d '{
           "token": "bacd627e-281d-4955-87f1-701019b2aaf9",
           "user_uuid": "f9617a2f-cee2-4c9e-b5c7-5d4aa5de44dc",
           "cart_id": 2
         }'

read -p "continue"

curl -X PUT http://localhost:8080/api/cart?action=amount \
     -H "Content-Type: application/json" \
     -d '{
           "token": "f9617a2f-cee2-4c9e-b5c7-5d4aa5de44dc",
           "amount": 14,
           "cart_id": 3
         }'

read -p "continue"

curl -X PUT http://localhost:8080/api/cart \
     -H "Content-Type: application/json" \
     -d '{
           "token": "f9617a2f-cee2-4c9e-b5c7-5d4aa5de44dc",
           "user_uuid": "f9617a2f-cee2-4c9e-b5c7-5d4aa5de44dc",
           "product_code": 100005,
           "amount": 44,
           "cart_id": 4
         }'

read -p "continue"

curl -X PUT http://localhost:8080/api/cart \
     -H "Content-Type: application/json" \
     -d '{
           "token": "bacd627e-281d-4955-87f1-701019b2aaf9",
           "user_uuid": "f9617a2f-cee2-4c9e-b5c7-5d4aa5de44dc",
           "product_code": 100001,
           "amount": 69,
           "cart_id": 4
         }'

read -p "continue"

curl -X DELETE http://localhost:8080/api/cart \
     -H "Content-Type: application/json" \
     -d '{
           "cart_id": 4
         }'

read -p "continue"

curl -X DELETE http://localhost:8080/api/cart?action=UUID \
     -H "Content-Type: application/json" \
     -d '{
           "token": "f9617a2f-cee2-4c9e-b5c7-5d4aa5de44dc"
         }'

read -p "continue"

read -p "Press enter to continue\n"
