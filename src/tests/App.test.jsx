import { describe, expect, it } from "vitest";
import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from 'react';
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
