export interface Logs {
  id: string;
  camera_id: string;
  filename: string;
  objects_detected: string[];
  date: string;
  time: string;
}
export interface Cameras {
  id?: string;
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

export interface CameraSettings {
  id?: string;
  camera_id: string;
  detection_objects: string[];
  enabled: boolean;
  minimum_confidence: number;
  enable_tracking: boolean;
  enable_counting: boolean;
  enable_zone: boolean;
  save_footage: boolean;
  start_time: string;
  end_time: string;
}
