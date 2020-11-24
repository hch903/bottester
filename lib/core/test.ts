import { initializeServer } from 'bottender';

export function setup() {
  return {
    server: initializeServer()
  };
}