import {
  Model,
  Table,
  Column
} from "sequelize-typescript";

@Table({
  tableName: "songs",
  timestamps: false
})
export default class Song extends Model {
  @Column
  music!: string;

  @Column
  artist!: string;

  @Column
  album!: string;

  @Column
  release_year!: number;

  @Column
  genre!: string;

  @Column
  is_banned!: boolean
}
