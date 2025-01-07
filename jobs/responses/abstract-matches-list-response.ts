import { AbstractResponse } from "./abstract-response";

export abstract class AbstractMatchesListResponse extends AbstractResponse {
  public abstract get list(): string[]
}