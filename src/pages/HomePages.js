import { Alert, Box, Button, Container, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import apiService from "../api/apiService";
import { FormProvider, FTextField } from '../components/form';
import LoadingScreen from '../components/LoadingScreen'
import { useForm } from 'react-hook-form';
import ProductList from '../components/ProductList';
import { InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FSelect from '../components/form/FSelect';
import ClearAllIcon from "@mui/icons-material/ClearAll";
import  FRadioGroup  from '../components/form/FRadioGroup'
import FMultiCheckbox from '../components/form/FMultiCheckbox'
import orderBy from "lodash/orderBy";



const FILTER_GENDER_OPTIONS = ["Men", "Women", "Kids"];
const FILTER_CATEGORY_OPTIONS = ["All", "Shose", "Apparel", "Accessories"];
const FILTER_PRICE_OPTIONS = [
  { value: "below", label: "Below $25" },
  { value: "between", label: "Between $25 - $75" },
  { value: "above", label: "Above $75" },
];

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "priceDesc", label: "Price: High-Low" },
  { value: "priceAsc", label: "Price: Low-High" },
];

const defaultValues = {
  gender: [],
  category: "All",
  priceRange: "",
  sortBy: "featured",
  searchQuery: "",
};

function HomePages() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  const methods = useForm({ defaultValues });
  const { watch, reset } = methods;
  // derived state
  const filters = watch();
  // console.log(">>> methdos", methods)  
  // console.log(">>>filter",filters)
  const filteredProducts = applyFilter(products, filters);
  // console.log(filteredProducts);
  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      try {
        const response = await apiService.get("/products");
        setProducts(response.data);
        setError("");
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    };
    getProducts();
  }, []);
  return (
    <Container sx={{ display: "flex", minHeight: "100vh", mt: 3 }}>
      <Stack>
              <FormProvider methods={methods}>
              <Stack spacing={3} sx={{ p: 3, width: 150 }}>
            <Stack>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Gender
              </Typography>
              <FMultiCheckbox name="gender" options={FILTER_GENDER_OPTIONS} />
            </Stack>

            <Stack>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Category
              </Typography>
              <FRadioGroup name="category" options={FILTER_CATEGORY_OPTIONS} />
            </Stack>

            <Stack>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Price
              </Typography>
              <FRadioGroup
                name="priceRange"
                options={FILTER_PRICE_OPTIONS.map((item) => item.value)}
                getOptionLabel={FILTER_PRICE_OPTIONS.map((item) => item.label)}
              />
            </Stack>

            <Box>
              <Button
                variant="outlined"
                onClick={() => reset()}
                startIcon={<ClearAllIcon />}
              >
                Clear All
              </Button>
            </Box>
          </Stack>
        </FormProvider>
      </Stack>


      <Stack sx={{ flexGrow: 1 }}>
        <FormProvider methods={methods}>
          <Stack
            spacing={2}
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
          >
            <FTextField
              name="searchQuery"
              sx={{ width: 300 }}
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            <FSelect name="sortBy" size="small" sx={{ width: 300 }}>
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </FSelect>
          </Stack>
        </FormProvider>
        <Box sx={{ position: "relative", height: 1 }}>
          {loading ? (
            <LoadingScreen />
          ) : (
            <>
              {error ? (
                <Alert severity="error">{error}</Alert>
              ) : (
                <ProductList products={filteredProducts} />
              )}
            </>
          )}
        </Box>
      </Stack>
    </Container>
  )
}
function applyFilter(products, filters) {
  let filteredProducts = products;
  if (filters.gender.length) {
    filteredProducts = filteredProducts.filter((product) =>
      filters.gender.includes(product.gender)
    );
  }

  if (filters.category !== "All") {
    filteredProducts = filteredProducts.filter(
      (product) => product.category === filters.category
    );
  }

  if (filters.priceRange) {
    filteredProducts = filteredProducts.filter((product) => {
      if (filters.priceRange === "below") {
        return product.price < 25;
      }
      if (filters.priceRange === "between") {
        return product.price >= 25 && product.price <= 75;
      }
      if (filters.priceRange === "above") {
        return product.price > 75;
      }
    });
  }

  if (filters.searchQuery) {
    filteredProducts = filteredProducts.filter((product) =>
      product.name.toLowerCase().includes(filters.searchQuery.toLowerCase())
    );
  }

  if (filters.sortBy === "featured") {
    filteredProducts = orderBy(filteredProducts, ["sold"], ["desc"]);
  }
  if (filters.sortBy === "newest") {
    filteredProducts = orderBy(filteredProducts, ["createdAt"], ["desc"]);
  }
  if (filters.sortBy === "priceDesc") {
    filteredProducts = orderBy(filteredProducts, ["price"], ["desc"]);
  }
  if (filters.sortBy === "priceAsc") {
    filteredProducts = orderBy(filteredProducts, ["price"], ["asc"]);
  }

  return filteredProducts;
}

export default HomePages

