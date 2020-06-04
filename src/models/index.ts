import mri from 'mri';
import { Options as BuildSettings } from 'electron-packager';

export interface WindowSettings {
  width: number;
  height: number;
  fullscreen: boolean;
  frame: boolean;
  transparent: boolean;
  toolbar: boolean;
  alwaysOnTop: boolean;
}

export interface DebugSettings {
  showConfig: boolean;
}

export interface DeveloperSettings {
  showConstructDevTools: boolean;
  autoClose: boolean;
  autoReload: boolean;
  showChromeDevTools: boolean;
}

export interface OverlaySettings {
  position: string;
  content: string;
}

export interface ProjectSettings {
  name: string;
  description: string;
  author: string;
  version: string;
}

export interface InternalSettings {
  settings: Settings;
  configFilePath: string;
}

export interface HookSettings<T> {
  steps: string[];
  config: T;
}

export type IHookRecord = Record<string, HookSettings<T>>

export interface HookRecord extends IHookRecord {
  'pre-build': HookSettings<null>;
  'build': HookSettings<BuildSettings>;
  'post-build': HookSettings<null>;

  'pre-package': HookSettings<null>;
  'package': HookSettings<BuildSettings>;
  'post-package': HookSettings<null>;
}

export type BaseHookSettings = Partial<HookRecord>

export type HooksSettings = BaseHookSettings

export interface RawSettings {
  electron?: string;
  errorLogging?: boolean;
  singleInstance?: boolean;
  window?: WindowSettings;
  debug?: DebugSettings;
  developer?: DeveloperSettings;
  overlay?: OverlaySettings;
  project?: ProjectSettings;
  plugins?: string[];
  switches?: string[];

  profiles?: Record<string, Settings>;

  on: HooksSettings;
}

export interface ProfileSettings {
  profiles?: Record<string, Settings>;
}

export type Settings = RawSettings & ProfileSettings

export interface SetupDirOptions {
  clearCache?: boolean;
}

export interface CliObject {
  name: string;
  shortcut?: string;
  description?: string;
  default?: string;
  boolean?: boolean;
}

export type moduleRun = (args: mri.Argv) => Promise<boolean> | boolean
export type hookRun = (hookArguments: unknown) => Promise<boolean>
export type onPreBuild = (args: mri.Argv, tmpdir: string)
  => Promise<boolean>
export type onPostBuild = (args: mri.Argv, out: string)
  => Promise<boolean>
export type onPostInstaller = (args: mri.Argv, folder: string)
  => Promise<boolean>
