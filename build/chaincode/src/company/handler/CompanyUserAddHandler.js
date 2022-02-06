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
exports.CompanyUserAddHandler = void 0;
const common_1 = require("@nestjs/common");
const logger_1 = require("@ts-core/common/logger");
const company_1 = require("@project/common/transport/command/company");
const error_1 = require("@project/common/ledger/error");
const guard_1 = require("@project/module/core/guard");
const CompanyService_1 = require("../service/CompanyService");
const role_1 = require("@project/common/ledger/role");
const promise_1 = require("@ts-core/common/promise");
const handler_1 = require("@hlf-core/transport/chaincode/handler");
const chaincode_1 = require("@hlf-core/transport/chaincode");
const stub_1 = require("@hlf-core/transport/chaincode/stub");
let CompanyUserAddHandler = class CompanyUserAddHandler extends handler_1.TransportCommandFabricAsyncHandler {
    service;
    constructor(logger, transport, service) {
        super(logger, transport, company_1.CompanyUserAddCommand.NAME);
        this.service = service;
    }
    async execute(params, holder) {
        await (0, guard_1.rolesSomeOf)(promise_1.PromiseReflector.create((0, guard_1.rolesCheck)(holder, role_1.LedgerRole.COMPANY_MANAGER)), promise_1.PromiseReflector.create((0, guard_1.rolesCompanyCheck)(holder, params.companyUid, role_1.LedgerCompanyRole.USER_MANAGER)));
        if (!(await holder.db.user.has(params.userUid))) {
            throw new error_1.LedgerError(error_1.LedgerErrorCode.NOT_FOUND, `Unable to find user ${params.userUid}`);
        }
        if (!(await holder.db.company.has(params.companyUid))) {
            throw new error_1.LedgerError(error_1.LedgerErrorCode.NOT_FOUND, `Unable to find company ${params.companyUid}`);
        }
        await this.service.userAdd(holder, params.companyUid, params.userUid, params.roles);
    }
};
__decorate([
    (0, guard_1.UserGuard)(),
    __param(1, (0, stub_1.StubHolder)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CompanyUserAddHandler.prototype, "execute", null);
CompanyUserAddHandler = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [logger_1.Logger, chaincode_1.TransportFabricChaincodeReceiver, CompanyService_1.CompanyService])
], CompanyUserAddHandler);
exports.CompanyUserAddHandler = CompanyUserAddHandler;
