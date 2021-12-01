/* eslint-disable new-cap */
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import Tool from './Tool';
import User from './User';
import Area from './Area';

@Entity('tool_request')
// eslint-disable-next-line require-jsdoc
export default class ToolRequest {
  @PrimaryGeneratedColumn()
  public id: number;
  @Column()
  public status: string;
  @Column()
  public date: Date;
  @Column()
  public quantity: number;
  @ManyToOne(
    _type => Tool,
    tool => tool.toolRequests,
  )
  public tool: Tool;
  @ManyToOne(
    _type => User,
    user => user.toolRequests,
  )
  public user: User;
  @ManyToOne(
    _type => Area,
    area => area.toolRequests,
  )
  public area: Area;

  public constructor(tool: Tool, user: User, status: string, date: Date, area: Area, quantity: number) {
    this.tool = tool;
    this.status = status;
    this.user = user;
    this.date = date;
    this.area = area;
    this.quantity = quantity;
  }

  public getId(): number {
    return this.id;
  }

  public getTool(): Tool {
    return this.tool;
  }

  public getUser(): User {
    return this.user;
  }

  public getStatus(): string {
    return this.status;
  }

  public getDate(): Date {
    return this.date;
  }

  public getArea(): Area {
    return this.area;
  }

  public getQuantity(): number {
    return this.quantity;
  }

  public getItemName(): string {
    return this.tool.getName();
  }

  public setStatus(status: string): void {
    this.status = status;
  }

  public setArea(area: Area): void {
    this.area = area;
  }

  public setTool(tool: Tool): void {
    this.tool = tool;
  }
}
