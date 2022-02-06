"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCryptoKeyChangeHandler = void 0;
const common_1 = require("@nestjs/common");
const logger_1 = require("@ts-core/common/logger");
const _ = require("lodash");
const user_1 = require("@project/common/transport/command/user");
const user_2 = require("@project/common/transport/event/user");
const guard_1 = require("@project/module/core/guard");
const error_1 = require("@project/common/ledger/error");
const role_1 = require("@project/common/ledger/role");
const handler_1 = require("@hlf-core/transport/chaincode/handler");
const chaincode_1 = require("@hlf-core/transport/chaincode");
const stub_1 = require("@hlf-core/transport/chaincode/stub");
let UserCryptoKeyChangeHandler = class UserCryptoKeyChangeHandler extends handler_1.TransportCommandFabricAsyncHandler {
    constructor(logger, transport) {
        super(logger, transport, user_1.UserCryptoKeyChangeCommand.NAME);
    }
    async execute(params, holder) {
        if (params.uid !== holder.user.uid) {
            await (0, guard_1.rolesCheck)(holder, role_1.LedgerRole.USER_MANAGER);
        }
        let item = await holder.db.user.cryptoKeyGet(params.uid);
        if (_.isNil(item)) {
            throw new error_1.LedgerError(error_1.LedgerErrorCode.NOT_FOUND, `Unable to find user ${params.uid}`);
        }
        item.value = params.cryptoKey.value;
        item.algorithm = params.cryptoKey.algorithm;
        await holder.db.user.cryptoKey.save(item);
        await holder.stub.dispatch(new user_2.UserCryptoKeyChangedEvent(holder.eventData));
    }
};
__decorate([
    (0, guard_1.UserGuard)(),
    __param(1, (0, stub_1.StubHolder)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserCryptoKeyChangeHandler.prototype, "execute", null);
UserCryptoKeyChangeHandler = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [logger_1.Logger, chaincode_1.TransportFabricChaincodeReceiver])
], UserCryptoKeyChangeHandler);
exports.UserCryptoKeyChangeHandler = UserCryptoKeyChangeHandler;
