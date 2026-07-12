import sympy
import re
from typing import Dict, Any

def parse_equation(eq_str: str) -> Dict[str, Any]:
    """
    Parses a string equation (e.g. 'r=sin(8*theta)') into components using SymPy.
    """
    # Clean up common missing multiplication signs like 8theta -> 8*theta
    eq_str = re.sub(r'(\d+)([a-zA-Z\u03B8]+)', r'\1*\2', eq_str)
    # Replace unicode theta if present
    eq_str = eq_str.replace('θ', 'theta')
    
    parts = eq_str.split('=')
    if len(parts) == 2:
        expr_str = parts[1].strip()
        eq_type = "polar" if parts[0].strip() == 'r' else "cartesian"
    else:
        expr_str = eq_str.strip()
        eq_type = "unknown"

    try:
        # Parse mathematical expression safely
        expr = sympy.sympify(expr_str)
        variables = [str(v) for v in expr.free_symbols]
        
        # Heuristic to find functions used (e.g. sin, cos)
        functions = []
        for atom in expr.atoms(sympy.Function):
            functions.append(str(atom.func))
            
        # Try to find a symmetry multiplier (e.g., 8 in sin(8*theta))
        symmetry = 1
        for arg in expr.args:
            if isinstance(arg, sympy.Function):
                for inner_arg in arg.args:
                    if inner_arg.is_Mul:
                        nums = [n for n in inner_arg.args if n.is_number]
                        if nums:
                            symmetry = int(nums[0])
                            break
        
        return {
            "type": eq_type,
            "expression": str(expr),
            "variables": variables,
            "functions": list(set(functions)),
            "symmetry": symmetry
        }
    except Exception as e:
        print(f"Error parsing equation: {e}")
        # Return fallback parsed object
        return {
            "type": eq_type,
            "expression": expr_str,
            "variables": ["theta"] if "theta" in expr_str else [],
            "functions": ["sin"] if "sin" in expr_str else [],
            "symmetry": 1
        }
