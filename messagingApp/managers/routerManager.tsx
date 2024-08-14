export default class RouterManager{

    static instance: RouterManager;
    public router;
    private constructor() {
        this.router = null;
    }
    static getInstance() {
        if (!RouterManager.instance) {
            RouterManager.instance = new RouterManager();
        }
        return RouterManager.instance;
    }

    public resetRouterAndReplace(baseRoute: string) {
        while (this.router.canGoBack()) {
          this.router.back();
        }
        this.router.replace(baseRoute);
      }
}