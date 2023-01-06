interface Result {
      name: string;
      url: string;
  }

interface pokePage{
      count: number;
      next: string;
      previous: string;
      results: Result[];
  }

export {pokePage}
