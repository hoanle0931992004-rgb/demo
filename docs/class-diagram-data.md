# Dữ liệu Class Diagram - Hệ thống Thu gom rác tái chế (theo detai.md)

## 1. User
-----------------
id: string
email: string
password: string
fullName: string
phone: string
address: string
avatar: string
role: string
isLocked: boolean
points: integer
createdAt: DateTime
updatedAt: DateTime
-----------------
login()
logout()
register()
getProfile()
updateProfile()
changePassword()

## 2. PasswordReset
-----------------
id: string
userId: string
token: string
expiresAt: DateTime
createdAt: DateTime
-----------------
createResetToken()
validateToken()
resetPassword()

## 3. WasteType
-----------------
id: string
name: string
description: string
pointsPerKg: double
isActive: boolean
createdAt: DateTime
updatedAt: DateTime
-----------------
list()
create()
update()
delete()
getPointsPerKg()

## 4. CollectionRequest
-----------------
id: string
customerId: string
wasteTypeId: string
staffId: string
quantity: double
estimatedQuantity: double
address: string
note: string
imageUrl: string
status: string
verifiedWeight: double
verifiedTypeId: string
pointsEarned: integer
completedAt: DateTime
createdAt: DateTime
updatedAt: DateTime
-----------------
create()
list()
getById()
cancel()
accept()
complete()
updateStatus()

## 5. StatusHistory
-----------------
id: string
requestId: string
status: string
note: string
createdAt: DateTime
-----------------
addHistory()
getHistory()

## 6. Reward
-----------------
id: string
name: string
description: string
pointsCost: integer
quantity: integer
imageUrl: string
isActive: boolean
createdAt: DateTime
updatedAt: DateTime
-----------------
list()
create()
update()
delete()
redeem()

## 7. RewardRedemption
-----------------
id: string
userId: string
rewardId: string
pointsSpent: integer
status: string
createdAt: DateTime
-----------------
create()
listMyRedemptions()

## 8. PointTransaction
-----------------
id: string
userId: string
amount: integer
type: string
description: string
referenceId: string
createdAt: DateTime
-----------------
addEarn()
addRedeem()
listTransactions()

## 9. AIService (hỗ trợ phân tích ảnh)
-----------------
-----------------
analyzeWaste(image: File)
suggestWasteType()
estimateQuantity()

## 10. Statistics (thống kê)
-----------------
-----------------
getCollectionStats()
getWasteStatsByType()
getReport(period: string)
