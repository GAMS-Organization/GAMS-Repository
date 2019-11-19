/* eslint-disable new-cap */
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Language from './Language';

@Entity('language_levels')
// eslint-disable-next-line require-jsdoc
export default class LanguageLevel {
  @PrimaryGeneratedColumn()
  public id: number;
  @Column()
  public level: string;
  @ManyToOne(_type => Language)
  private language: Language;

  public constructor(level: string, language: Language) {
    this.level = level;
    this.language = language;
  }

  public getId(): number {
    return this.id;
  }

  public getLevel(): string {
    return this.level;
  }

  public setLevel(level: string): void {
    this.level = level;
  }

  public getLanguage(): Language {
    return this.language;
  }

  public setLanguage(value: Language) {
    this.language = value;
  }
}
