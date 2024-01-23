# rent-test
```
rent-test
├─ .dockerignore
├─ .eslintignore
├─ .eslintrc.json
├─ .github
│  ├─ pull_request_template.md
│  └─ workflows
│     └─ ci.yaml
├─ .gitignore
├─ .lintstagedrc
├─ .prettierignore
├─ .prettierrc
├─ api-docs
│  ├─ openapi.yaml
│  ├─ parameters
│  │  ├─ accept-language.yaml
│  │  ├─ active-not-req.yaml
│  │  ├─ active-req.yaml
│  │  ├─ archive.yaml
│  │  ├─ common
│  │  │  ├─ active.yaml
│  │  │  └─ archive.yaml
│  │  ├─ email-not-req.yaml
│  │  ├─ email-req.yaml
│  │  ├─ id-not-req.yaml
│  │  ├─ id-req.yaml
│  │  ├─ pagination
│  │  │  ├─ field-id.yaml
│  │  │  ├─ field-name.yaml
│  │  │  ├─ field-pid.yaml
│  │  │  ├─ field-rating.yaml
│  │  │  ├─ field-reviewed-id.yaml
│  │  │  ├─ field-reviewer-id.yaml
│  │  │  ├─ field.yaml
│  │  │  ├─ limit.yaml
│  │  │  ├─ offset.yaml
│  │  │  └─ order.yaml
│  │  ├─ phone-not-req.yaml
│  │  └─ phone-req.yaml
│  ├─ paths
│  │  ├─ category.yaml
│  │  ├─ dummy.yaml
│  │  ├─ forgot-password.yaml
│  │  ├─ login.yaml
│  │  ├─ refresh-token.yaml
│  │  ├─ registration.yaml
│  │  ├─ review.yaml
│  │  ├─ send-otp.yaml
│  │  └─ user.yaml
│  ├─ schemas
│  │  ├─ category
│  │  │  ├─ delete-200.yaml
│  │  │  ├─ get-200.yaml
│  │  │  ├─ patch-200.yaml
│  │  │  ├─ patch-409.yaml
│  │  │  ├─ patch-req.yaml
│  │  │  ├─ post-201.yaml
│  │  │  ├─ post-409.yaml
│  │  │  └─ post-req.yaml
│  │  ├─ common
│  │  │  ├─ 200.yaml
│  │  │  ├─ 201.yaml
│  │  │  ├─ 400.yaml
│  │  │  ├─ 401.yaml
│  │  │  ├─ 403.yaml
│  │  │  ├─ 404.yaml
│  │  │  ├─ 409.yaml
│  │  │  ├─ 500.yaml
│  │  │  ├─ invalid-credentials.yaml
│  │  │  └─ unauthorized.yaml
│  │  ├─ dummy
│  │  │  ├─ get-res.yaml
│  │  │  ├─ post-409.yaml
│  │  │  └─ post-req.yaml
│  │  ├─ forgot-password
│  │  │  ├─ 200.yaml
│  │  │  └─ update-req.yaml
│  │  ├─ login
│  │  │  ├─ 200.yaml
│  │  │  ├─ post-req.yaml
│  │  │  └─ post-res.yaml
│  │  ├─ refresh-token
│  │  │  ├─ 200.yaml
│  │  │  └─ get-req.yaml
│  │  ├─ registration
│  │  │  ├─ 200.yaml
│  │  │  ├─ post-req.yaml
│  │  │  └─ post-res.yaml
│  │  ├─ review
│  │  │  ├─ delete-200.yaml
│  │  │  ├─ get-200.yaml
│  │  │  ├─ patch-200.yaml
│  │  │  ├─ patch-req.yaml
│  │  │  ├─ post-201.yaml
│  │  │  ├─ post-409.yaml
│  │  │  └─ post-req.yaml
│  │  ├─ sent-otp
│  │  │  ├─ 200.yaml
│  │  │  └─ post-req.yaml
│  │  └─ user
│  │     └─ 200.yaml
│  ├─ _openapi.json
│  ├─ _parameter.yaml
│  ├─ _paths.yaml
│  ├─ _schemas.yaml
│  └─ _tags.yaml
├─ docker
│  ├─ docker-compose.yml
│  ├─ express
│  │  └─ DockerfileDev
│  └─ script
│     ├─ remove-images.sh
│     ├─ start-containers.sh
│     └─ start-mysql.sh
├─ index.ts
├─ lint-staged.config.js
├─ nodemon.json
├─ openapitools.json
├─ package.json
├─ README.md
├─ scripts
│  └─ api-schema.sh
├─ src
│  ├─ apis
│  │  ├─ api-docs.ts
│  │  └─ index.ts
│  ├─ application
│  │  └─ usecase
│  │     ├─ auth
│  │     │  ├─ forgot-password.usecase.ts
│  │     │  ├─ login.usecase.ts
│  │     │  ├─ refresh-token.usecase.ts
│  │     │  ├─ registration.usecase.ts
│  │     │  └─ sent-otp.usecase.ts
│  │     ├─ category
│  │     │  ├─ create-category.usecase.ts
│  │     │  ├─ delete-category.usecase.ts
│  │     │  ├─ get-category.usecase.ts
│  │     │  └─ update-category.usecase.ts
│  │     ├─ dummy
│  │     │  ├─ create-dummy.usecase.ts
│  │     │  ├─ delete-dummy.usecase.ts
│  │     │  ├─ get-dummy.usecase.ts
│  │     │  └─ update-dummy.usecase.ts
│  │     ├─ review
│  │     │  ├─ create-review.usecase.ts
│  │     │  ├─ delete-review.usecase.ts
│  │     │  ├─ get-review.usecase.ts
│  │     │  └─ update-review.usecase.ts
│  │     └─ user
│  │        └─ get-user.usecase.ts
│  ├─ domain
│  │  └─ entities
│  │     ├─ auth
│  │     │  ├─ forgot-password.interface.ts
│  │     │  ├─ login.interface.ts
│  │     │  ├─ registration.interface.ts
│  │     │  └─ sent-otp.interface.ts
│  │     ├─ category
│  │     │  ├─ category-delete.interface.ts
│  │     │  ├─ category-get.interface.ts
│  │     │  ├─ category-patch.interface.ts
│  │     │  └─ category-post.interface.ts
│  │     ├─ common
│  │     │  ├─ db-fields.interface.ts
│  │     │  └─ pagination.ts
│  │     ├─ dummy
│  │     │  ├─ dummy-get.interface.ts
│  │     │  └─ dummy-post.interface.ts
│  │     ├─ index.ts
│  │     ├─ review
│  │     │  ├─ review-delete.interface.ts
│  │     │  ├─ review-get.interface.ts
│  │     │  ├─ review-patch.interface.ts
│  │     │  └─ review-post.interface.ts
│  │     └─ user
│  │        └─ user-get.interface.ts
│  ├─ infrastructure
│  │  ├─ configs
│  │  │  ├─ commonDomains
│  │  │  │  └─ HttpError.ts
│  │  │  ├─ constants
│  │  │  │  ├─ application-tag.ts
│  │  │  │  ├─ constants.ts
│  │  │  │  ├─ enums.ts
│  │  │  │  └─ statusCodes.ts
│  │  │  └─ language
│  │  │     ├─ en.ts
│  │  │     └─ hi.ts
│  │  ├─ env
│  │  │  └─ index.ts
│  │  ├─ helpers
│  │  │  ├─ fm-ts
│  │  │  │  └─ index.ts
│  │  │  ├─ hash
│  │  │  │  └─ md5.hash.ts
│  │  │  ├─ logger
│  │  │  │  └─ index.ts
│  │  │  ├─ res
│  │  │  │  └─ index.ts
│  │  │  ├─ s3
│  │  │  │  └─ index.ts
│  │  │  ├─ sms
│  │  │  ├─ token
│  │  │  │  └─ jwt-HS256.token.ts
│  │  │  ├─ twilio otp
│  │  │  │  ├─ phone-otp.twilio.ts
│  │  │  │  └─ whatsapp-utils.ts
│  │  │  ├─ utils
│  │  │  │  ├─ random-name.ts
│  │  │  │  └─ random-number.ts
│  │  │  └─ validator
│  │  │     └─ index.ts
│  │  ├─ orm
│  │  │  ├─ repositories
│  │  │  │  └─ mysql-repositories
│  │  │  │     ├─ auth
│  │  │  │     │  ├─ auth-repo.interface.ts
│  │  │  │     │  └─ auth.repo.ts
│  │  │  │     ├─ category
│  │  │  │     │  ├─ category-repo.interface.ts
│  │  │  │     │  └─ category.repo.ts
│  │  │  │     ├─ common
│  │  │  │     │  ├─ common-repo.interface.ts
│  │  │  │     │  └─ common.repo.ts
│  │  │  │     ├─ dummy
│  │  │  │     │  ├─ dummy-repo.interface.ts
│  │  │  │     │  └─ dummy.repo.ts
│  │  │  │     ├─ review
│  │  │  │     │  ├─ review-repo.interface.ts
│  │  │  │     │  └─ review.repo.ts
│  │  │  │     └─ user
│  │  │  │        ├─ user-repo.interface.ts
│  │  │  │        └─ user.repo.ts
│  │  │  └─ sequelize
│  │  │     ├─ entities
│  │  │     │  ├─ m_category.ts
│  │  │     │  ├─ m_user.ts
│  │  │     │  ├─ t_dummy.ts
│  │  │     │  ├─ t_login.ts
│  │  │     │  ├─ t_otp.ts
│  │  │     │  ├─ t_review.ts
│  │  │     │  └─ utils.ts
│  │  │     └─ index.ts
│  │  └─ webserver
│  │     └─ express
│  │        └─ index.ts
│  ├─ interface
│  │  ├─ controller
│  │  │  ├─ auth
│  │  │  │  ├─ forgot-password.controller.ts
│  │  │  │  ├─ login.controller.ts
│  │  │  │  ├─ refresh-token.controller.ts
│  │  │  │  ├─ registration.controller.ts
│  │  │  │  └─ sent-otp.controller.ts
│  │  │  ├─ category
│  │  │  │  ├─ create-category.controller.ts
│  │  │  │  ├─ delete-category.controller.ts
│  │  │  │  ├─ get-category.controller.ts
│  │  │  │  └─ update-category.controller.ts
│  │  │  ├─ dummy
│  │  │  │  ├─ create-dummy.controller.ts
│  │  │  │  ├─ delete-dummy.controller.ts
│  │  │  │  ├─ get-dummy.controller.ts
│  │  │  │  └─ update-dummy.controller.ts
│  │  │  ├─ review
│  │  │  │  ├─ create-review.controller.ts
│  │  │  │  ├─ delete-review.controller.ts
│  │  │  │  ├─ get-review.controller.ts
│  │  │  │  └─ update-review.controller.ts
│  │  │  └─ user
│  │  │     └─ get-user.controller.ts
│  │  └─ validation
│  │     ├─ auth
│  │     │  ├─ forgot-password.schema.ts
│  │     │  ├─ login.schema.ts
│  │     │  ├─ refresh-token.schema.ts
│  │     │  ├─ registration.schema.ts
│  │     │  └─ sent-otp.schema.ts
│  │     ├─ category
│  │     │  ├─ create-category.schema.ts
│  │     │  ├─ delete-category.schema.ts
│  │     │  ├─ get-category.schema.ts
│  │     │  └─ update-category.schema.ts
│  │     ├─ common
│  │     │  └─ pagination.schema.ts
│  │     ├─ dummy
│  │     │  ├─ create-dummy.schema.ts
│  │     │  └─ get-test.schema.ts
│  │     ├─ review
│  │     │  ├─ create-review.schema.ts
│  │     │  ├─ delete-review.schema.ts
│  │     │  ├─ get-review.schema.ts
│  │     │  └─ update-review.schema.ts
│  │     └─ user
│  │        └─ get-user.schema.ts
│  └─ test
├─ tsconfig.json
└─ yarn.lock

```