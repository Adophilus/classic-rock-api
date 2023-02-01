import {
  Column,
  Model,
  PrimaryKey,
  Table
} from "sequelize-typescript";

@Table({
  tableName: "songs",
  timestamps: false
})
export default class Song extends Model {
  @PrimaryKey
  @Column
  public music!: string;

  @Column
  public artist!: string;

  @Column
  public album!: string;

  @Column
  public release_year!: number;

  @Column
  public genre!: string;

  @Column
  public is_banned!: boolean
}
