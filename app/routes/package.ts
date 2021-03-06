import { Request, Response } from "express";
import BaseRouter from "./base";
import PackageService from "../services/package";
import TopologySort from "../services/topologySort";

class PackageRouter extends BaseRouter {
  constructor() {
    super();
    this.setupRoute();
  }

  setupRoute(): void {
    this.router.get("/:pkgName", this.getPackageGraph);
    this.router.get("/:pkgName/sort", this.getTopologySort);
  }

  async getPackageGraph(req: Request, res: Response): Promise<void> {
    const { pkgName } = req.params;

    const graph = await new PackageService().getGraph(pkgName);

    res.json(graph);
  }

  async getTopologySort(req: Request, res: Response): Promise<void> {
    const { pkgName } = req.params;

    const { nodes, edges } = await new PackageService().getGraph(pkgName);
    const topo: TopologySort = new TopologySort({ nodes, edges });
    res.json(topo.sort());
  }
}

export default new PackageRouter().router;
