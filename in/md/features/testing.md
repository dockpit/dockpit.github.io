---
slug: testing
priority: 5
command: pit test
output: ' - address_list/”return 200” - OK, - address_create/”redirect to index”- OK, - address_create/”fail on duplicate” - OK,   All passed took 150ms'
---
When dependencies are mocked you can __run the test cases__ quickly and reliably to make sure the service is implemented correctly.
