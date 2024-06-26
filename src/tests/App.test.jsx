import { describe, expect, it } from "vitest";
import { screen, render } from "@testing-library/react";
import KitchenRegister from '../Components/KitchenRegisterPage';

describe("KitchenRegister component", () => {
  it("renders loading state initially", () => {
    const kitchenuser = {
        displayName: 'Test User',
        email: 'test@example.com',
        uid: 'test-uid'
      };
  
     render(<KitchenRegister kitchenuser={kitchenuser} />);
      expect(screen.getByText('Loading...')).toBeInTheDocument();
      
  });
  
})
