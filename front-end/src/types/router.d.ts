declare module "vue-router" {
  interface RouteMeta {
    requiresAuth?: boolean;
    requiredRole?: string;
    layout?: any;
    errorCode?: number;
    title?: string;
  }
}

export {};
