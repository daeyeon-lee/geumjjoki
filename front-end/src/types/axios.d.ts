import axios from 'axios';
import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

declare module 'axios' {
  interface InternalAxiosRequestConfig {
    skipAuth?: boolean;
  }
}
