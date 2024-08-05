interface AskGroup {
  /**
   * UUID
   */
  id: string;
  /** 群组名称 */
  name: string;
  /** 群组描述 */
  description: string;
  /** 创建时间 */
  createdAt: string;
  products: AskGroupProduct[];
}

interface AskGroupProduct {
  /**
   * UUID
   */
  id: string;
  /** 产品名称 */
  name: string;
  /** 产品描述 */
  description: string;
  /** 产品价格 */
  price: number;
  createdAt: string;
}
