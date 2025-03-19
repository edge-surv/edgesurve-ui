export interface Logs {
  id: string;
  camera_id: string;
  filename: string;
  objects_detected: string[];
  date: string;
  time: string;
}
export interface Cameras {
  id: string;
  host: string;
  port: number;
  name: string;
  username: string;
  password: string;
  provider: string;
  location: string;
  status: "online" | "offline" | "recording";
}
export interface Notifications {
  id: string;
  objects: string[];
  date: string;
  time: string;
}
