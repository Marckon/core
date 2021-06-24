import { Uri } from '@ali/ide-core-common';
import {
  Event,
  Emitter,
} from '@ali/ide-core-common';
import {
    FileChangeEvent,
    FileStat,
    FileType,
    FileSystemProvider,
  } from '../common';
import { Injectable } from '@ali/common-di';
import { BinaryBuffer } from '@ali/ide-core-common/lib/utils/buffer';

@Injectable()
export class ShadowFileSystemProvider implements FileSystemProvider {

    readonly: boolean = true;

    shadowFiles: Map<string, Uint8Array> = new Map();
    private fileChangeEmitter = new Emitter<FileChangeEvent>();
    onDidChangeFile: Event<FileChangeEvent> = this.fileChangeEmitter.event;
    watch(uri: Uri, options: { recursive: boolean; excludes: string[]; }): number {
        throw new Error('Method not implemented.');
    }
    stat(uri: Uri): Promise<FileStat> {
      return Promise.resolve({
        uri: uri.toString(),
        lastModification: 0,
      } as FileStat);
    }
    readDirectory(uri: Uri): [string, FileType][] | Promise<[string, FileType][]> {
        throw new Error('Method not implemented.');
    }
    createDirectory(uri: Uri) {
        throw new Error('Method not implemented.');
    }
    readFile(uri: Uri) {
        const content = this.shadowFiles.get(uri.toString());
        return content || BinaryBuffer.fromString('no available').buffer;
    }
    writeFile(uri: Uri, content: Uint8Array, options: { create: boolean; overwrite: boolean; }) {
        this.shadowFiles.set(uri.toString(), content);
    }
    delete(uri: Uri, options: { recursive: boolean; moveToTrash?: boolean; }) {
        throw new Error('Method not implemented.');
    }
    rename(oldUri: Uri, newUri: Uri, options: { overwrite: boolean; }) {
        throw new Error('Method not implemented.');
    }
    copy?(source: Uri, destination: Uri, options: { overwrite: boolean; }) {
        throw new Error('Method not implemented.');
    }
    exists?(uri: Uri | Uri): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    access?(uri: Uri, mode: number): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
}
