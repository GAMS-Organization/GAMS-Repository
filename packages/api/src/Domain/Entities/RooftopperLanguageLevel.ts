/* eslint-disable new-cap */
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import RooftopperProfile from './RooftopperProfile';
import LanguageLevel from './LanguageLevel';

@Entity('rooftopper_language_levels')
// eslint-disable-next-line require-jsdoc
export default class RooftopperLanguageLevel {
  @PrimaryGeneratedColumn()
  public id: number;
  @ManyToOne(_type => RooftopperProfile, rooftopperProfile => rooftopperProfile.profileLanguageLevels)
  public rooftopperProfile: RooftopperProfile;
  @ManyToOne(_type => LanguageLevel)
  public languageLevel: LanguageLevel;

  public constructor(rooftopperProfile: RooftopperProfile, languageLevel: LanguageLevel) {
    this.rooftopperProfile = rooftopperProfile;
    this.languageLevel = languageLevel;
  }
  public getLanguageLevel(): LanguageLevel {
    return this.languageLevel;
  }

  public setLanguageLevel(value: LanguageLevel) {
    this.languageLevel = value;
  }

  public getRooftopperProfile(): RooftopperProfile {
    return this.rooftopperProfile;
  }

  public setRooftopperProfile(value: RooftopperProfile) {
    this.rooftopperProfile = value;
  }
}
