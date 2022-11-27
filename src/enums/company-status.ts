export enum CompanyStatus {
    ACTIVE,
    INACTIVE,
    PENDING_APPROVAL
}

export function GetStatusCompany(status: CompanyStatus){
    if(status === CompanyStatus.ACTIVE)
        return "Ativo"

    if(status === CompanyStatus.INACTIVE)
        return "Inativo"

    if(status === CompanyStatus.PENDING_APPROVAL)
        return "Pendente de aprovação"

    return "Status não localizado"
}