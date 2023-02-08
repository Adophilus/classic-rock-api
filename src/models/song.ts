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
  declare public music: string;

  @Column
  declare public artist: string;

  @Column
  declare public album: string;

  @Column
  declare public release_year: number;

  @Column
  declare public genre: string;

  @Column
  declare public is_banned: boolean;
}
