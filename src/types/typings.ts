export interface NavItemsType {
    id: string;
    title: string;
    href: string;
}

export interface ButtonType {
    text: string;
    icon?: JSX.Element;
    clickFunction: () => void
}

export interface DelegateTableType {
    data: {
        name: string,
        votes: string,
        quorum_percent: string,
        delegate_votes_percent: string,
        image: string,
    }[]
}


export interface Tabs {
    tab: string
}

export interface TransactionCardType {
    type: string,
    asset: string,
    hash: string,
    value: string,
}