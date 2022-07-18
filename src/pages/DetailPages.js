import { Stack ,Alert, Breadcrumbs, Card, Container, Divider, Grid, Link, Rating, Typography, Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useParams, Link as RouterLink } from 'react-router-dom';
import apiService from '../api/apiService';
import { Box } from '@mui/system';
import LoadingScreen from '../components/LoadingScreen';
import ReactMarkdown from "react-markdown";
import { fCurrency } from '../utils';
import rehypeRaw from "rehype-raw";
import useCartContext from '../hooks/useCartContext';


function DetailPages() {
  const [product, setProduct] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const { dispatch } = useCartContext();

  useEffect(() => {
    if (params.id) {
      const getProduct = async () => {
        setLoading(true);
        try {
          const response = await apiService.get(`/products/${params.id}`);
          setProduct(response.data);
          setError("");
        } catch (error) {
          setError(error.message);
        }
        setLoading(false);
      };
      getProduct();
    }
  }, [params]);
  return (
    
    <Container sx={{ my: 3 }}>
    <Breadcrumbs sx={{ mb: 4 }}>
      <Link underline="hover" color="inherit" component={RouterLink} to="/">
        CoderStore
      </Link>
      <Typography color="text.primary">{product?.name}</Typography>
    </Breadcrumbs>
    <Box sx={{ position: "relative", height: 1 }}>
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          {error ? (
            <Alert severity="error">{error}</Alert>
          ) : (
            <>
              {product ? (
                <Card>
                  <Grid container>
                    <Grid item xs={12} md={6}>
                      <Box p={2}>
                        <Box
                          sx={{
                            borderRadius: 2,
                            overflow: "hidden",
                            display: "flex",
                          }}
                        >
                          <img
                            src={product.cover}
                            width="100%"
                            height="100%"
                            alt="product"
                          />
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography
                        variant="h6"
                        sx={{
                          mt: 2,
                          mb: 1,
                          display: "block",
                          textTransform: "uppercase",
                          color:
                            product.status === "sale"
                              ? "error.main"
                              : "info.main",
                        }}
                      >
                        {product.status}
                      </Typography>
                      <Typography variant="h5" paragraph>
                        {product.name}
                      </Typography>
                      <Stack
                        direction="row"
                        alignItems="center"
                        spacing={1}
                        sx={{ mb: 2 }}
                      >
                        <Rating
                          value={product.totalRating}
                          precision={0.1}
                          readOnly
                        />
                        <Typography
                          variant="body2"
                          sx={{ color: "text.secondary" }}
                        >
                          ({product.totalReview} reviews)
                        </Typography>
                      </Stack>
                      <Typography variant="h4" sx={{ mb: 3 }}>
                        <Box
                          component="span"
                          sx={{
                            color: "text.disabled",
                            textDecoration: "line-through",
                          }}
                        >
                          {product.priceSale && fCurrency(product.priceSale)}
                        </Box>
                        &nbsp;{fCurrency(product.price)}
                      </Typography>

                      <Divider sx={{ borderStyle: "dashed" }} />
                      <Box>
                        <ReactMarkdown
                          rehypePlugins={[rehypeRaw]}
                          children={product.description}
                        />
                      </Box>
                      <Divider sx={{ borderStyle: "dashed" }} />
                      <Box sx={{ my: 3 }}>
                        <Button
                          sx={{background:"#FF8C94"}}
                          variant="contained"
                          onClick={() =>
                            dispatch({ type: "ADD", payload: product })
                          }
                        >
                          Add to Cart
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </Card>
              ) : (
                <Typography variant="h6">Product not found!</Typography>
              )}
            </>
          )}
        </>
      )}
    </Box>
  </Container>
  )
}

export default DetailPages