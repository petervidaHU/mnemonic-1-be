import { Entity, Column } from 'typeorm';

@Entity()
export class MnemoEntity {
  @Column()
  id: string;

  @Column()
  acronyms: string;

  @Column()
  text: string;

  @Column()
  status: string;

  @Column()
  createdAt: string;

  @Column()
  flagged: boolean;
}
