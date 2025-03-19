export interface Logs {
  id: string;
  camera_id: string;
  filename: string;
  objects_detected: string[];
  date: string;
  time: string;
}

export interface Camera {
  id: string;
  name: string;
  location: string;
  status: "online" | "offline" | "recording";
  stream_url: string;
  username?: string;
  password?: string;
  provider?: string;
}

export interface Notifications {
  id: string;
  objects: string[];
  date: string;
  time: string;
}
