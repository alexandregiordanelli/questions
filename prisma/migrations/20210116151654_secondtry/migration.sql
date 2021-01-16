-- AlterIndex
ALTER TABLE `accounts` RENAME INDEX `compound_id` TO `accounts.compound_id_unique`;

-- AlterIndex
ALTER TABLE `accounts` RENAME INDEX `provider_account_id` TO `providerAccountId`;

-- AlterIndex
ALTER TABLE `accounts` RENAME INDEX `provider_id` TO `providerId`;

-- AlterIndex
ALTER TABLE `accounts` RENAME INDEX `user_id` TO `userId`;

-- AlterIndex
ALTER TABLE `sessions` RENAME INDEX `access_token` TO `sessions.access_token_unique`;

-- AlterIndex
ALTER TABLE `sessions` RENAME INDEX `session_token` TO `sessions.session_token_unique`;

-- AlterIndex
ALTER TABLE `users` RENAME INDEX `email` TO `users.email_unique`;

-- AlterIndex
ALTER TABLE `verification_requests` RENAME INDEX `token` TO `verification_requests.token_unique`;
