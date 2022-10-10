export interface INFT {
    id: string; 
    owner: string;
    __typename: string;
}

export interface IRune extends INFT {
    basePower: number;
    baseDurability: number;
    baseIntelligence: number;

    power: number;
    durability: number;
    intelligence: number;
}

export type DotaNFT = IRune